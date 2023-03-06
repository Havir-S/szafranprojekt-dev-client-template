import React, {useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

import { Pagination, PaginationItem } from '@material-ui/lab'
import {Link, Box} from 'react-router-dom';




const Paginate = ({ strona, setSearchParams, howManyPosts }) => {




    return (
        <Pagination

            count={howManyPosts}
            page={Number(strona) || 1}

            color="primary"
            renderItem={(item) => (
                // <PaginationItem {...item} component={Box} to={`/klienci/all?strona=${item.strona}`} onClick={() => { setSearchParams({strona: 1})}} />
                <PaginationItem {...item}  onClick={() => { console.log('ding'); setSearchParams({strona: item.page})} } />
            )}
             />
    )
}

export default Paginate;