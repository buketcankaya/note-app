export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

// Verileri lokal'de tututarken kullanıcığımı veri tipi
// Verilerli veritabalanarıdan tutarken dizide elemanlar
// genelde sadece id lerini tutumayı tercih ederiz
export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
