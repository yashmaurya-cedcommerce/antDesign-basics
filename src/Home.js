import { DeleteOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd'
import React, { useState } from 'react'


export default function Home() {

    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: '1',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: '2',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: '3',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: '4',
            render: (record) => {
                return <>
                    <span onClick={()=>deleteUser(record)}><DeleteOutlined style={{ color: "red", fontSize: 18, cursor: 'pointer' }} /></span>
                </>
            }
        },
    ];

    var deleteUser = (myRecord) => {
        console.log(myRecord)
        var tempArray = dataSource.filter(user=>user.id !=myRecord.id)
        console.log(tempArray)
        setDataSource([...tempArray])
        // setDataSource(prev=> {
        //     prev.filter(user=>user.id !== myRecord.id)
        // })
    }

    const fetchData = () => {
        var tempArr = []
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(temp => {

                temp.map((item, index) => {
                    tempArr.push({
                        id: parseInt(index)+1,
                        name: item.name,
                        age: Math.floor(Math.random() * 100) + 10,
                        address: item.address.street,
                    })
                })
                setDataSource([...tempArr])
            })
    }


    return (
        <div className='homeContainer'>
            <h1>Ant Design</h1>
            <Button onClick={() => fetchData()}>Fetch Data</Button>
            <div className='tableDiv'>
                <Table dataSource={dataSource} columns={columns} />
            </div>

        </div>
    )
}
