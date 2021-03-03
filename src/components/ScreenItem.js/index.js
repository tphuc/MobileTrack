import { Button, Code, Display, Image, Spacer, Table, Text, Modal, useModal } from '@geist-ui/react';
import React, { useState } from 'react';
// Display



const ScreenItem = ({data, id, ...props}) => {
    



    const parseTableData = (data, mapForm = (form) => form) => {
        if(!data){
            return []
        }
        let result =Object.keys(data).map(key => ({
            id: key,
            ...mapForm(data[key])
        }))
        return result
    }


    const { visible, setVisible, bindings } = useModal();

    const [displayData, setDisplayData] = useState({
        selectedJSON: ''
    })




    return (
    <Display style={{width:'95vw', }} shadow>

        <div style={{display:"flex",width:"95vw", justifyContent:"space-between", flexDirection:"row"}}>
            {/* <div style={styles.item}>
                {id}
            </div> */}
            <div  style={styles.item}>
                <Text style={{textAlign:"center"}} h6>{data.title}</Text>
                <Image src={data.image} width={200} height={450}></Image>
                <Text style={{textAlign:"center"}}>{data.description}</Text>
            </div>
            <div style={{...styles.item, flex:3}}>
                <Table data={parseTableData(data?.apis, (form) => ({
                    ...form,
                    format: 
                    (<>
                        {form.format.substring(0, 50)}
                        <Spacer/>
                        <Button auto onClick={() => {
                            setDisplayData(prev => ({
                                ...prev,
                                selectedJSON: form.format
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
        <Modal {...bindings}>
            <Text>{displayData.selectedJSON}</Text>
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