import { useParams, Outlet, Navigate } from "react-router-dom";
import { Note } from "../types";

type LayoutPropsType = {
  notes: Note[];
};

// Url den aldığı id'ye göre doğru notu bulucak
// Ve bu notun bilgini bütün çocuk route'lara aktarıcak
const Layout = ({ notes }: LayoutPropsType) => {
  const { id } = useParams();

  // note'u bul
  const found = notes.find((n) => n.id === id);

  // eğerki note bulunmazsa anasayfa yönlendir
  if (!found) return <Navigate to={"/"} replace />;

  // alt route'u ekrana bas ve url'e göre
  // aldığımız note'u prop gönderme
  return <Outlet context={found} />;
};

export default Layout;
