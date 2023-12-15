import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
// Partial sayeseinde şunu yapmış olduk
// Farklı bir type'In bütün değerlerini
// bu "CreateNoteProps" type'ına aktardık
// aynı zmana paritals kullanıdımığımı için
// hepsi ? ile tanımlanmış gibi bazı durumlarda undefined olabilir

const CreateNote = ({
  availableTags,
  onSubmit,
  createTag,
}: CreateNoteProps) => {
  return (
    <div className="container py-4">
      <h1>Yeni Not Oluştur</h1>
      <NoteForm
        availableTags={availableTags}
        createTag={createTag}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CreateNote;
