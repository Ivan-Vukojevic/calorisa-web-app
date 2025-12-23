export const getNoteText = (note, t) => {
  if (note && typeof note === 'object') {
    if (note.text) return note.text;
    if (note.id) {
      const translated = t(`main.products.noteLabels.${note.id}`);
      return translated && translated !== `main.products.noteLabels.${note.id}` ? translated : note.id;
    }
    return '';
  }
  if (typeof note === 'string') {
    const isKey = /^[a-z0-9-_]+$/i.test(note);
    if (isKey) {
      const translated = t(`main.products.noteLabels.${note}`);
      return translated && translated !== `main.products.noteLabels.${note}` ? translated : note;
    }
    return note;
  }
  return '';
};
