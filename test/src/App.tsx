import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Table } from "./components/table";
import { useData } from "./hooks/useData";
import { useForm } from "react-hook-form";

type FormData = {
  file: File | null;
};

function App() {
  const [currentData, setCurrentData] = useState<any>([]);
  const { getData, uploadData } = useData();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      file: null,
    },
  });

  const selectedFile = watch("file");

  useEffect(() => {
    getData()
      .then((data) => {
        setCurrentData(data.data);
      })
      .catch((error) => {
        console.error(error);
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

  const uploadFile = (formData: FormData) => {
    uploadData(selectedFile as File)
      .then((data) => {
        setCurrentData(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App px-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center">
        Lab results
      </h2>
      {currentData.length > 0 ? (
        <div className="full-width overflow-x-auto overflow-hidden">
          <Table headers={headers} data={currentData} />
        </div>
      ) : (
        <form
          className="flex flex-col items-start gap-2"
          onSubmit={handleSubmit(uploadFile)}
        >
          <h3>No results found, please upload a file</h3>
          <label>Upload data</label>
          <input
            type="file"
            accept=".txt"
            multiple={false}
            {...register("file", { validate: (value) => value !== null })}
            onChange={(e) => setValue("file", e.target.files?.[0] ?? null)}
          />
          {errors.file && (
            <p className="text-red-700">This field is required</p>
          )}
          {selectedFile && <p>{selectedFile.name}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
