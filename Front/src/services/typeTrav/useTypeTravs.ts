import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { notifyThere } from '../context';
import { TypeTravsData, TYPETRAVS } from './useTypeTravs.sql';


export const useTypeTravs = () => {

  const {result, onError, onResult, loading: loadTypetravs } = useQuery<TypeTravsData>(TYPETRAVS, {}, {
    fetchPolicy: 'cache-and-network',
  })

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);
  });

  onError(error => {
    logErrorMessages(error);
  });

const typeTravsOption = useResult(result, [], data => data.typeTravs.map(item => ({
  label: item.label,
  value: item.typeTravId
})))

  return {typeTravsOption, loadTypetravs}
}
