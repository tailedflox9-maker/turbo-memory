import React from 'react';
import { PopularBusiness } from '../types';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Skeleton
} from '@mui/material';

interface PopularBusinessesTableProps {
    businesses: PopularBusiness[];
    isLoading: boolean;
}

const TableSkeleton = () => (
    [...Array(5)].map((_, i) => (
        <TableRow key={i}>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
        </TableRow>
    ))
);


export const PopularBusinessesTable: React.FC<PopularBusinessesTableProps> = ({ businesses, isLoading }) => {
    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" component="h3" sx={{ p: 2 }}>
                Most Popular Businesses
            </Typography>
            <Table aria-label="popular businesses table">
                <TableHead>
                    <TableRow>
                        <TableCell>Business Name</TableCell>
                        <TableCell align="right">Total Interactions</TableCell>
                        <TableCell align="right">Views</TableCell>
                        <TableCell align="right">Calls</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? <TableSkeleton /> : (
                        businesses.length > 0 ? businesses.map(business => (
                            <TableRow
                                key={business.business_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {business.shopName}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{business.total_interactions}</TableCell>
                                <TableCell align="right">{business.views}</TableCell>
                                <TableCell align="right">{business.calls}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                    No interaction data available.
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};