import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
// @ts-ignore
import useProduct from 'vtex.product-context/useProduct';
import productRealeaseDate from './graphql/productReleaseDate.graphql';
import { TimeSplit } from './typings/global';
import { getTwoDaysFromNow, tick } from './utils/time';
import { useCssHandles } from 'vtex.css-handles';

const DEFAULT_TARGET_DATE = getTwoDaysFromNow();
const CSS_HANDLES = ['countdown']; // Define o array com os handles necessários

const Countdown: StorefrontFunctionComponent = () => {
    const [ timeRemaining, setTime ] = useState<TimeSplit>({
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    const handles = useCssHandles(CSS_HANDLES);

    const { product } = useProduct();
    const { data, loading, error } = useQuery(productRealeaseDate, {
        variables: {
            slug: product?.linkText
        },
        ssr: false
    });

    if(!product)
    {
        return (
            <div>
                <span>There is no product context.</span>
            </div>
        );
    }

    if(loading)
    {
        return (
            <div>
                <span>Loading...</span>
            </div>
        );
    }

    if(error)
    {
        return (
            <div>
                <span>Erro!</span>
            </div>
        );
    }
    
    tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime);


    return (
        <div className={`${handles.countdown} db tc`}>
            <h1>{`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}</h1>
        </div>
    );
}

// Schema se refere ao conteúdo que é mostrado no Site Editor
Countdown.schema = {
    title: 'editor.countdown.title',
    description: 'editor.countdown.description',
    type: 'object',
    properties: {
        targetDate: {
            title: 'Data final',
            description: 'Data final utilizada no contador',
            type: 'string',
            default: null
        }
    },
}

export default Countdown;
