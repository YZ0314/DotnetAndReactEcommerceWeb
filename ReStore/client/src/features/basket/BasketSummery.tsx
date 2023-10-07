import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { StoreContext, useStoreContext } from "../../app/context/StoreContext";
import { useEffect, useState } from "react";
import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    const [subtotal, setSubtotal] = useState<number>();
    const deliveryFee = subtotal===0||subtotal !== undefined && subtotal >=50000? 0:1000;
    const { basket } = useStoreContext();
    let total: number = 0;
    useEffect(() => {
        basket?.items.forEach((item) => {
            total += item.quantity * item.price
        })
        const fixedTotal = currencyFormat(total)
        setSubtotal(total);
    }, [basket])

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">
                                {subtotal !== undefined ? currencyFormat(subtotal) : '$0.00'}
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right"> {currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{subtotal !== undefined&& subtotal !== 0 ? currencyFormat(deliveryFee+subtotal) : '$0.00'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over $500 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}