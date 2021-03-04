export const getSelections = ({ fieldNodes }: any): string => {
  const fields = fieldNodes[0].selectionSet.selections
    .map(({ name: { value } }: any) => value)
    .filter((value: string) => value !== 'authors')

  return [...fields, 'authors{first_name, last_name}'].join(',')
}
