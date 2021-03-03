import React, { useState } from 'react';
import { db, storage } from '../../services/firebase'
import { GeistProvider, CssBaseline, Button, Display, Modal, useModal, Input, Grid, Text, Divider, Textarea, Spacer, Table } from '@geist-ui/react'
import FileUploader from "react-firebase-file-uploader";
import _ from 'lodash';



const TranslationItemForm = ({ onAdd = () => { }, }) => {
    const [form, setForm] = React.useState({
        en: '',
        de: '',
    })
    return <div>
        <Input value={form.en} onChange={(e) => setForm(prev => ({
            ...prev,
            en: e.target.value
        }))} placeholder='en'></Input>
        <Spacer x={.5} inline />
        <Input value={form.de} onChange={(e) => setForm(prev => ({
            ...prev,
            de: e.target.value
        }))} placeholder='ge'></Input>
        <Spacer x={.5} inline />
        <Button auto onClick={() => onAdd(form)} type='secondary' size='small'>+</Button>
    </div>
}


const APIItemForm = ({ onAdd = () => { }, }) => {
    const [form, setForm] = React.useState({
        title: '',
        status: '',
        format: ''
    })
    return <Grid.Container style={{ width: "100%" }} gap={1}>
        <Grid md={7}>
            <Input value={form.title} width='100%' placeholder='title' onChange={(e) => setForm(prev => ({
                ...prev,
                title: e.target.value
            }))} />
        </Grid>
        <Grid md={3}>
            <Input value={form.status} width='100%' placeholder='status' onChange={(e) => setForm(prev => ({
                ...prev,
                status: e.target.value
            }))} />
        </Grid>
        <Grid md={12}>
            <Textarea value={form.format} width='100%' placeholder='format' onChange={(e) => setForm(prev => ({
                ...prev,
                format: e.target.value
            }))} />
        </Grid>

        <Grid md={1}>
            <Button auto onClick={() => onAdd(form)} size='small' type='secondary'>+</Button>
        </Grid>
    </Grid.Container>
}



const Edit = ({current, ...props}) => {

    const [form, setForm] = React.useState({
        file: null,
        url: '',
        apis: [],
        translations: [],
        description: '',
        title: ''

    })

    const handleFileChange = (e) => {
        setForm(prev => ({
            ...prev,
            file: e.target.files[0]
        }))

    }

    const operationAPI = (actions, rowData) => {
        return <Button type="error" auto size="mini" onClick={() => {
            let apis = [...form.apis];
            _.remove(apis, item => item.title == rowData.rowValue.title);
            setForm(prev => ({
                ...prev,
                apis: apis
            }))
        }}>-</Button>
    }

    const operationTranslation = (actions, rowData) => {
        return <Button type="error" auto size="mini" onClick={() => {
            let translations = [...form.translations];
            _.remove(translations, item => item.en == rowData.rowValue.en);
            setForm(prev => ({
                ...prev,
                translations
            }))
        }}>-</Button>
    }


    const handleUpload = async (callback = (url) => {}) => {
        const uploadTask = storage.ref(`/images/${form.file.name}`).put(form.file);
        await uploadTask.on("state_changed", console.log, console.error, () => {
            storage
                .ref("images")
                .child(form.file.name)
                .getDownloadURL()
                .then((url) => {
                    console.log(86, url)
                    setForm(prev => ({
                        ...prev,
                        url: url
                    }))
                    callback(url)

                })
                .catch(err => {
                    alert('Loi xay ra!')
                });
        });
    }


    const onSubmit = async () => {
        await handleUpload(async (url) => {
            var newScreenRef = await db.ref('/screens').push({
            image: url,
            title: form.title,
            description: form.description,
        })

        let key = newScreenRef.key;
        var apisUpdate = {};
        form.apis.map(item => {
            var newKey = db.ref().child(`/screens/${key}/apis/`).push().key;
            apisUpdate[`/screens/${key}/apis/` + newKey] = item;
        });
        await db.ref().update(apisUpdate);

        var translationsUpdate = {}
        form.translations.map(item => {
            var newKey = db.ref().child(`/screens/${key}/translations/`).push().key;
            translationsUpdate[`/screens/${key}/translations/` + newKey] = item;
        });
        await db.ref().update(translationsUpdate);
        })


        




    }


    return (

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "flex-start" }}>
            <br />

  
                <label style={{ backgroundColor: '#111', color: 'white', padding: 6, borderRadius: 4, cursor: 'pointer' }}>
                    {form?.file?.name || 'Select screenshot'}
                    <input hidden type="file" onChange={handleFileChange} />
                </label>


            <br />


            <Input style={{ width: '100%' }} placeholder='Title' onChange={(e) => setForm(prev => ({
                ...prev,
                title: e.target.value
            }))}></Input>
            <br />
            <Textarea value={form.description} onChange={(e) => setForm(prev => ({
                ...prev,
                description: e.target.value
            }))} placeholder='Description'></Textarea>
            <br />

            <Text style={{ display: "block" }} h6>API</Text>

            <Table data={form.apis?.map(item => ({
                ...item, operation: operationAPI
            }))}>
                <Table.Column prop='title' label='title' />
                <Table.Column prop='status' label='status' />
                <Table.Column prop='format' label='format' />
                <Table.Column prop='operation' label='-' />
            </Table>
            <br />
            <APIItemForm onAdd={(item) => {
                if (!_.find(form.apis, it => it.title === item.title)) {
                    setForm(prev => ({
                        ...prev,
                        apis: [
                            ...prev.apis,
                            { ...item }
                        ]
                    }))
                }

            }} />



            <br />
            <Text style={{ display: "block" }} h6>TRANSLATION</Text>
            <Table data={form.translations?.map(item => ({
                ...item, operation: operationTranslation
            }))}>
                <Table.Column prop='en' label='English' />
                <Table.Column prop='de' label='German' />
                <Table.Column prop='operation' label='-' />
            </Table>
            <br />

            <TranslationItemForm
                onAdd={(item) => {
                    if (!_.find(form.translatiosn, it => it.en === item.en)) {
                        setForm(prev => ({
                            ...prev,
                            translations: [
                                ...prev.translations,
                                { ...item }
                            ]
                        }))
                    }

                }}
            />

            <Divider></Divider>
            <Button onClick={() => onSubmit()} type='success'>SUBMIT</Button>

        </div>
    )
}


export default Edit;
