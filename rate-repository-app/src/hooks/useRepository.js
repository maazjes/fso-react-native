import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, { variables });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      }
    });
  };
  return {
    data,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepository;
