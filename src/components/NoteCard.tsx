import { Note } from "../types";
import { Card, Stack, Badge } from "react-bootstrap";
import styles from "./mainpage.module.css";
import { useNavigate } from "react-router-dom";

type CardType = {
  note: Note;
};
const NoteCard = ({ note }: CardType) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/${note.id}`)} className={styles.note_card}>
      <Card.Body>
        <Stack
          className="align-items-center justify-content-between h-100"
          gap={2}
        >
          <span>{note.title}</span>
          {note.tags.length > 0 && (
            <Stack
              className="justify-content-center flex-wrap"
              direction="horizontal"
            >
              {note.tags.map((tag) => (
                <Badge>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
