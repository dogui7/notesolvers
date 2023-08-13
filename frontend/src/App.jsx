import Header from "./components/Header";
import NotesList from "./components/NotesList";
import CreateNote from "./components/CreateNote.jsx";
import EditNote from "./components/EditNote.jsx";
import SingleNote from "./components/SingleNote.jsx";
import ArchivedNotes from "./components/ArchivedNotes.jsx";
import Error404 from "./components/Error404";

import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<NotesList/>}/>
      <Route path="/archived" element={<ArchivedNotes/>}/>
      <Route path="/note/:id" element={<SingleNote/>}/>
      <Route path="/create" element={<CreateNote/>}/>
      <Route path="/edit/:id" element={<EditNote/>}/>
      <Route path="*" element={<Error404/>}/>
    </Routes>
    </>
  )
}

export default App