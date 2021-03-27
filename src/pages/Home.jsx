import React, {
  useContext,
  useEffect,
  useState,
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

import { fetchShowsByPage } from '../services/ShowsService';

function Home() {
  const location = useLocation();

  const { sessionUser } = useContext(AuthContext);

  const params = new URLSearchParams(location.search);
  // const query = decodeURIComponent(params.get('query') || '');
  const paramPage = Number(params.get('page') || '');

  const [recentShows, setRecentShows] = useState();
  const [shows, setShows] = useState();
  const [page, setPage] = useState(paramPage);

  const { name, picture } = sessionUser;
  const fullName = `${name.title} ${name.first} ${name.last}`;

  useEffect(async () => {
    if (shows === undefined) {
      const data = await fetchShowsByPage(page);
      setRecentShows(data.splice(0, 7));
      setShows(data.splice(7, data.length));
    }
  }, [shows, setShows, setRecentShows]);

  const handleNextPage = async (nextPage) => {
    if (nextPage < 0) {
      return;
    }
    setShows(null);
    const data = await fetchShowsByPage(nextPage);
    setPage(nextPage);
    setShows(data);
    window.history.replaceState(null, null, `?page=${nextPage}`);
  };

  const Loading = () => (
    <Flex justify="center" align="center">
      <CircularProgress margin="6" isIndeterminate />
    </Flex>
  );

  console.log(recentShows, shows);

  return (
    <>
      {(sessionUser && recentShows) ? (
        <Flex flex="1">
          <Drawer />
          <Flex direction="column" flex="7" height="100%">
            <Navbar
              fullName={fullName}
              thumbnail={picture.thumbnail}
            />
            <Flex flex="90" direction="column" padding="2">
              <RecentShowsCard fullName={fullName} recentShows={recentShows} />
              {shows ? (
                <>
                  <Flex direction="row" flexWrap="wrap" height="100%">
                    {shows.slice(0, 4).map((show) => (
                      <Card
                        key={show.id}
                        title={show.name}
                        image={show.image.medium}
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
                      image={shows[4].image.original}
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
                          image={show.image.medium}
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
              ) : <Loading /> }
              <Flex justify="space-between" align="center" padding="4">
                <Button onClick={() => handleNextPage(page - 1)}>Prev</Button>
                <Text as="caption">{page + 1}</Text>
                <Button onClick={() => handleNextPage(page + 1)}>Next</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : <Loading />}
    </>
  );
}

export default Home;
