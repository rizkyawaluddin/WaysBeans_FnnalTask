import { Container, } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import React, { useState} from 'react';
import { useQuery } from 'react-query'
import Navbar from "../components/navbar/Navbar";

import Rp from 'rupiah-format'
import { API } from '../config/api'

function Transaction() {
    let { data: transaction } = useQuery("transactionsCache", async () => {
        const response = await API.get("/transactions");
        return response.data.data;
    });
    return(
        <>
        <Navbar/>
        <Container>
            <div className="mt-3 px-5">
                <h3 className="colorPrimary mb-4">Income Transaction</h3>
                <Table hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Income</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* MAPPING */}
                    {transaction?.map((item,index) => (
                            <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{item?.user.name}</td>
                            {/* <td>{item?.user.profile?.address}</td> */}
                            <td>{item?.user.email}</td>
                            <td className="tdPrice">{Rp.convert(item?.total)}</td>
                            <td className={
                                item.status === 'success'
                                ? 'statusSuccess'
                                : item.status === 'failed'
                                ? 'statusCancel'
                                : item.status === 'Waiting Approve'
                                ? 'statusWaiting'
                                :'statusWay'
                            }>{item?.status}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
        </>
    )
}

export default Transaction