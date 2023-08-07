import { useMany, useDelete, useUpdate, } from "@refinedev/core"; 

const DeleteOne = (table, rowId) => {
	const { mutate } = useDelete();

	mutate({
		resource: table,
		id: rowId,
	});
}

const GetGroupData = (table, rowIds) => {
	const { data, isLoading, isError } = useMany({
		resource: table,
		ids: rowIds
	});

	const group = data?.data ?? [];

	if (isLoading) {
    	return <div>Loading...</div>
  	}

  	if (isError) {
    	return <div>Something went wrong</div>
  	}

  	return group;
}

export { GetGroupData, DeleteOne }