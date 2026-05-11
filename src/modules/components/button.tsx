'use client';
import * as React from 'react';
import { Button } from '@base-ui/react/button';

export default function ExampleButton() {
    const [loading, setLoading] = React.useState(false);

    return (
        <Button
            className="box-border flex items-center justify-center gap-1.5 h-10 px-3.5 m-0 outline-none border-none rounded-md
            bg-gray-50 text-base font-normal leading-6 text-gray-900 select-none no-underline max-sm:text-[0.925rem] max-sm:px-2
            hover:bg-gray-100 data-popup-open:bg-gray-100 focus-visible:relative focus-visible:outline-2 focus-visible:outline-blue-500
            focus-visible:-outline-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            focusableWhenDisabled
            onClick={() => {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 4000);
            }}
        >
            {loading ? 'Submitting' : 'Submit'}
        </Button>
    );
}