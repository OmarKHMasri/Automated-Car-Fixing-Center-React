import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useMemo } from "react"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"

export default function CarListTable(props) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["CarData"],
        queryFn: async () => await axios("https://6803758e0a99cb7408ec0c5e.mockapi.io/api/usersEnd/Cars")
    })

    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'ID'
        },
        {
            accessorKey: 'carOwner',
            header: 'Owner'
        },
        {
            accessorKey: 'carMod',
            header: 'Model'
        },
        {
            accessorKey: 'carYear',
            header: 'Year'
        },
        {
            accessorKey: 'carMan',
            header: 'Manufacturer'
        },
        {
            accessorKey: 'carColor',
            header: 'Color'
        },
        {
            accessorKey: 'carMileage',
            header: ' Mileage'
        },
        {
            accessorKey: 'regCity',
            header: 'Registration City'
        },
        {
            accessorKey: 'plateNumber',
            header: 'Plate Number'
        }

    ], [])

    const table = useMaterialReactTable({
        columns: columns,
        data: data ? data.data : [],
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (e) => {
                props.setClickedRow([+row.original.id , 0])
                console.log(e , row.getValue , row.id , row.index );
            },
            sx: {
              cursor: 'pointer',
            },
          }),
        
    })
    if (isLoading) {
        return <span class="loader"></span>
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    console.log(data);


    return (
        <MaterialReactTable table={table} />
    )
}