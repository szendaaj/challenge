type Column = {
  id: string;
  label: string;
};

type TableProps = {
  headers: Column[];
  data: any[];
};

export const Table = ({ headers, data }: TableProps) => {
  return (
    <table className="table-auto">
      <thead>
        <tr className="border-b-2 border-gray-500">
          {headers.map((header) => {
            return (
              <th key={header.id} className="py-2 px-4 capitalize">
                {header.label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          return (
            <tr key={index} className="even:bg-gray-100">
              {headers.map((header) => {
                return (
                  <td className="text-center py-2 px-4" key={header.id}>
                    {row[header.id]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
