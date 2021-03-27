import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Heading,
  Flex,
  Image,
} from '@chakra-ui/react';

function RecentShowsCard({ fullName, recentShows }) {
  return (
    <Box
      flex="1"
      margin="2"
      border="1px"
      borderColor="gray.300"
      borderRadius="4px"
    >
      <Flex margin="2" marginLeft="4" direction="column">
        <Heading size="md">
          Hello
          {', '}
          {fullName}
        </Heading>
      </Flex>
      <Flex justify="center">
        {recentShows.map(({ id, name, image }) => (
          <Box key={id} margin="2">
            <Image src={image.medium} alt={name} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

RecentShowsCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  recentShows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      medium: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default RecentShowsCard;
