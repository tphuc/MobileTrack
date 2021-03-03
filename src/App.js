import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { db, storage } from './services/firebase'
import { GeistProvider, CssBaseline, Button, Display, Modal, useModal, Input, Grid, Text } from '@geist-ui/react'
import FileUploader from "react-firebase-file-uploader";
import ScreenItem from './components/ScreenItem.js';
import Add from './components/Add';


const schemas = {

}




function App() {

  const test = async () => {

  }

  const [data, setData] = useState({
    screens: []
  })
  const { visible, setVisible, bindings } = useModal();

  const test2 = () => {
    var pushedRef = db.ref('/users').push({ email: 'asd' });

  }
  React.useEffect(() => {
    var userRefs = db.ref('/screens')
    userRefs.on('value', (snapshot) => {
        setData(prev => ({
          ...prev,
          screens: snapshot.val()
        }))
    })
  }, []);

  // const [ addform, setAddForm ] = React.useState({
  //   file: null,
  //   url: '',
  //   apis: [],
  //   translation: [],
  //   note: ''
  // })

 


  // const handleUploadSuccess = filename => {
  //   storage
  //     .ref("images")
  //     .child(filename)
  //     .getDownloadURL()
  //     .then(url => {
  //       setAddForm(prev => ({
  //         ...addform,
  //         image_url: url
  //       }))
  //     });
  // };
 

  // React.useEffect(() => {
  //   // console.log(63, data.screens);
  //   Object.keys(data.screens).map(key => console.log(key, data.screens[key]))
  // }, [data.screens])


  // const handleFileChange = (e) => {
  //     setAddForm(prev => ({
  //       ...prev,
  //       file: e.target.files[0]
  //     }))

  // }

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   console.log(78)
  //   const uploadTask = storage.ref(`/images/${addform.file.name}`).put(addform.file);
  //   uploadTask.on("state_changed", console.log, console.error, () => {
  //       storage
  //       .ref("images")
  //       .child(addform.file.name)
  //       .getDownloadURL()
  //       .then((url) => {
  //         console.log(86, url)
  //         setAddForm(prev => ({
  //           ...prev,
  //           file: null,
  //           url:url
  //         }))
          
  //       })
  //       .catch(err => {
  //         alert('Loi xay ra!')
  //       });
  //   });
  // }
  

  return (
    <GeistProvider>
    <CssBaseline /> 
    <Display width='95vw'>

      {/* ------------------------------- */}
      

      <Modal width="90vw" {...bindings}>
        <Add/>
      </Modal>
      {/* ------------------------------- */}
        
      

      </Display>
        {
          Object.keys(data.screens || []).map((key, id) => <ScreenItem key={id} id={key} data={data.screens[key]} />)
        }
        <Button auto style={{position:"fixed", right:20, bottom:20}}  onClick={() => setVisible(true)} type='secondary'>
        add +
      </Button>
    </GeistProvider>
    
      
  );
}

export default App;
