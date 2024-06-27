import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Table } from "./components/table";
import { useData } from "./hooks/useData";

function App() {
  const [currentData, setCurrentData] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { getData } = useData();

  useEffect(() => {
    getData().then((data) => {
      setCurrentData(data);
    });
  }, [getData]);

  const headers = useMemo(() => {
    return currentData.length
      ? Object.keys(currentData[0]).map((key) => ({
          id: key,
          label: key.replace(/_/g, " ").toLowerCase(),
        }))
      : [];
  }, [currentData]);

  return (
    <div className="App">
      {currentData.length > 0 ? (
        <Table headers={headers} data={currentData} />
      ) : (
        <div>
          <label>Upload data</label>
          <input
            type="file"
            accept=".txt"
            multiple={false}
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />
          {selectedFile && <p>{selectedFile.name}</p>}
          <button>Submit</button>
        </div>
      )}
    </div>
  );
}

export default App;
