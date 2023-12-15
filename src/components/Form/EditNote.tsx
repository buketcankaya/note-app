import { useOutletContext } from "react-router-dom";
import { Note, NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

type EditPropsType = {
  onSubmit: (id: string, data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, availableTags, createTag }: EditPropsType) => {
  // outletten alınan prop
  const props: Note = useOutletContext();

  return (
    <div className="container py-5">
      <h1>Note'u düzenle</h1>
      <NoteForm
        title={props.title}
        markdown={props.markdown}
        tags={props.tags}
        onSubmit={(data) => onSubmit(props.id, data)}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default EditNote;
