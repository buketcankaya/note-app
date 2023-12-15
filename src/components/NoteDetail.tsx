import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";
import { Note } from "../type";
import ReactMarkdown from "react-markdown";

type DetailPropsType = {
  deleteNote: (id: string) => void;
};

const NoteDetail = ({ deleteNote }: DetailPropsType) => {
  // outlet ile gönderilen propları alma
  const props: Note = useOutletContext();

  return (
    <div className="container py-5">
      <Row>
        <Col>
          <h1>{props.title}</h1>

          <Stack direction="horizontal" gap={3} className="flex-wrap">
            {props.tags?.map((tag) => (
              <Badge className="fs-6">{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2} className="align-items-center">
            {/* "/" > kullnamazsak carolan route'un devamına ekleme yapar */}
            <Link to="edit">
              <Button>Düzenle</Button>
            </Link>

            <Button
              onClick={() => {
                deleteNote(props.id);
              }}
              variant="outline-danger"
            >
              Sil
            </Button>

            <Link to={"/"}>
              <Button variant="outline-secondary">Geri</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <ReactMarkdown className={"my-5"}>{props.markdown}</ReactMarkdown>
    </div>
  );
};

export default NoteDetail;
