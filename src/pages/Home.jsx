import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import { useLocation } from 'react-router-dom';

import {
  CircularProgress,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthProvider';

import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';
import Card from '../components/Card';
import RecentShowsCard from '../components/RecentShowsCard';

import { fetchShowsByPage, searchShows } from '../services/ShowsService';

function Home() {
  const location = useLocation();

  const { sessionUser } = useContext(AuthContext);

  const params = new URLSearchParams(location.search);
  const query = decodeURIComponent(params.get('query') || '');
  const paramPage = Number(params.get('page') || '');

  const [recentShows, setRecentShows] = useState();
  const [shows, setShows] = useState();
  const [page, setPage] = useState(paramPage);

  const [searchQuery, setSearchQuery] = useState(query);
  const [showsFound, setShowsFound] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const { name, picture } = sessionUser;
  const fullName = `${name.title} ${name.first} ${name.last}`;

  const fechShows = useCallback(async () => {
    const data = await fetchShowsByPage(page);
    setRecentShows(data.splice(0, 7));
    setShows(data.splice(7, data.length));
  });

  const handleSearchShows = useCallback(async (inputQuery) => {
    let data = null;
    if (showsFound === undefined || inputQuery !== searchQuery) {
      if (inputQuery) {
        data = await searchShows(inputQuery);
      }
      setShowsFound(data);
      setSearchQuery(inputQuery);
      window.history.replaceState(null, null, data ? `?page=${page}&query=${inputQuery}` : `?page=${page}`);
    }
    setIsLoading(false);
  });

  useEffect(() => {
    if (shows === undefined) {
      fechShows();
    }
    if (searchQuery && showsFound === undefined) {
      handleSearchShows(searchQuery);
    }
  }, [shows, fechShows, searchQuery, handleSearchShows]);

  const handleNextPage = useCallback(async (nextPage) => {
    if (nextPage < 0) {
      return;
    }
    setIsLoading(true);
    const data = await fetchShowsByPage(nextPage);
    setPage(nextPage);
    setShows(data);
    window.history.replaceState(null, null, `?page=${nextPage}`);
    setIsLoading(false);
  });

  const Loading = () => (
    <Flex justify="center" align="center">
      <CircularProgress margin="6" isIndeterminate />
    </Flex>
  );

  return (
    <>
      {(sessionUser && recentShows) ? (
        <Flex flex="1">
          <Drawer />
          <Flex direction="column" flex="7" height="100%">
            <Navbar
              fullName={fullName}
              thumbnail={picture.thumbnail}
              searchQuery={searchQuery}
              searchShows={handleSearchShows}
            />
            <Flex flex="90" direction="column" padding="2">
              {!searchQuery && (
                <RecentShowsCard
                  fullName={fullName}
                  recentShows={recentShows}
                />
              )}
              {(shows && !searchQuery) && (
                <>
                  <Flex direction="row" flexWrap="wrap" height="100%">
                    {shows.slice(0, 4).map((show) => (
                      <Card
                        key={show.id}
                        title={show.name}
                        image={show.image ? show.image.medium : null}
                        genres={show.genres}
                        officialSite={show.officialSite}
                      />
                    ))}
                  </Flex>
                  <Flex direction="row" flexWrap="wrap">
                    <Card
                      size="lg"
                      key={shows[4].id}
                      title={shows[4].name}
                      image={shows[4].image ? shows[4].image.original : null}
                      genres={shows[4].genres}
                      officialSite={shows[4].officialSite}
                      summary={shows[4].summary}
                    />
                    <Flex flex="1" flexWrap="wrap">
                      {shows.slice(5, 7).map((show) => (
                        <Card
                          size="md"
                          key={show.id}
                          title={show.name}
                          image={show.image ? show.image.medium : null}
                          genres={show.genres}
                          officialSite={show.officialSite}
                          summary={show.summary}
                        />
                      ))}
                    </Flex>
                  </Flex>
                  <Flex flexWrap="wrap">
                    {shows.slice(7, shows.length).map((show) => (
                      <Card
                        size="md"
                        key={show.id}
                        title={show.name}
                        image={show.image ? show.image.medium : null}
                        genres={show.genres}
                        officialSite={show.officialSite}
                        summary={show.summary}
                      />
                    ))}
                  </Flex>
                </>
              )}
              {showsFound && (
                <Flex flexWrap="wrap">
                  {showsFound.map(({ show }) => (
                    <Card
                      size="md"
                      key={show.id}
                      title={show.name}
                      image={show.image ? show.image.medium : null}
                      genres={show.genres}
                      officialSite={show.officialSite}
                      summary={show.summary}
                    />
                  ))}
                </Flex>
              )}
              {((shows && shows.length === 0) || (showsFound && showsFound.length === 0)) && (
                <Flex justify="center" align="center">
                  <Text marginTop="20">Not found :(</Text>
                </Flex>
              )}
              {isLoading && <Loading />}
              {(shows && !searchQuery) && (
                <Flex justify="space-between" align="center" padding="4">
                  <Button onClick={() => handleNextPage(page - 1)}>Prev</Button>
                  <Text size="sm">{page + 1}</Text>
                  <Button onClick={() => handleNextPage(page + 1)}>Next</Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      ) : <Loading />}
    </>
  );
}

export default Home;
