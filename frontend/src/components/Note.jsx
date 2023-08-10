import React, { useEffect, useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Note(props) {

    
    return (
        <Grid item xs={3}>                                         
            <Card>
                <CardHeader title={props.data.title}/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.data.text}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        
    )
}
