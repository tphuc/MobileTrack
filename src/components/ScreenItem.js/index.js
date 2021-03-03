import { Button, Code, Display, Image, Spacer, Table, Text, Modal, useModal, Textarea } from '@geist-ui/react';
import React, { useState } from 'react';
import Edit from '../Edit';
// Display



const ScreenItem = ({data, id, ...props}) => {
    



    const parseTableData = (data, mapForm = ({row}) => row) => {
        if(!data){
            return []
        }
        let result =Object.keys(data).map(key => ({
            id: key,
            ...mapForm({row: data[key], data: data})
        }))
        return result
    }


    const { visible, setVisible, bindings } = useModal();

    const [displayData, setDisplayData] = useState({
        selectedAPI: {}
    })


    const parseJson = (string) => {
        try{
            return JSON.stringify(JSON.parse(string), undefined, 4)
        }
        catch{
            console.log(37, string)
            return string
        }
    }



    return (
    <Display style={{width:'95vw', }} shadow>

        <div style={{display:"flex",width:"95vw", justifyContent:"space-between", flexDirection:"row"}}>
            {/* <div style={styles.item}>
                {id}
            </div> */}
            
            <div  style={styles.item}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                <Text  h6>{data.title}</Text>
                <Button onClick={() => setVisible(true)} auto type='secondary-light' size='mini'>Edit </Button>
                </div>
                
                <Image src={data.image} width={200} height={450}></Image>
                <Text style={{textAlign:"center"}} size='small' p>{data.description}</Text>
            </div>
            <div style={{...styles.item, flex:3}}>
                <Table data={parseTableData(data?.apis, ({row}) => ({
                    ...row,
                    format: 
                    (<>
                        {row.format.substring(0, 50)}
                        <Spacer/>
                        <Button auto onClick={() => {
                            console.log(row.format)
                            setDisplayData(prev => ({
                                ...prev,
                                selectedJSON: row.format
                            }))
                            setVisible(true)
                        }}  size='mini'>View</Button>
                    </>
                    )
                }))}>
                    <Table.Column prop='title' label='API'></Table.Column>
                    <Table.Column prop='status' label='status'></Table.Column>
                    <Table.Column prop='format' label='format'></Table.Column>
                </Table>
            </div>
            <div style={styles.item}>
                <Table data={parseTableData(data?.translations)}>
                    <Table.Column prop='en' label='Eng'></Table.Column>
                    <Table.Column prop='de' label='Ger'></Table.Column>
                </Table>
            </div>
        </div>
        <Modal width='80vw' {...bindings}>
            <Textarea minHeight='500px' value={parseJson(displayData.selectedJSON)}></Textarea>
        </Modal>

    </Display>
    )
}


const styles = {
    item: {
        flex:1,
        padding:10,
        borderTop:'1px solid #eeeeef',
        borderBottom: '1px solid #eeeeef',
        borderLeft:'1px solid #eeeeef'
    }
}


export default ScreenItem;