import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { NoteData, RawNote, Tag } from "./types";
import { useLocaleStorage } from "./useLocaleStorage";
import { v4 } from "uuid";
import { useMemo } from "react";
import MainPage from "./components/MainPage";
import NoteDetail from "./components/NoteDetail";
import Layout from "./components/Layout";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  // lokalden aldığımız norlarda etiket ismi yerine id geliyor
  // bizim yapıcağımı id lerin herbine karşılık gelen etiketleri
  // bulucaz ve objeye ekliyecez (performans için memo kullandık)
  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  // yeni note oluşturur
  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(),
          // elemanın etiketlerini dön idlerini diziye aktar
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  };

  // yeni etiket oluştur
  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  // note'u sil
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // note'u düzenle
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    // bir note alıcaz
    // notu state'de tutuğumuz dizedeki halini bulucaz
    // dizideki eski verisyonu kaldırıcaz
    // yerine aldığımız yeni notu koyucaz
    const updated = notes.map((note) =>
      note.id === id
        ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        : note
    );

    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />

        <Route
          path="/new"
          element={
            <CreateNote
              availableTags={tags}
              createTag={createTag}
              onSubmit={addNote}
            />
          }
        />

        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          <Route index element={<NoteDetail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
