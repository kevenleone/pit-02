import React from 'react'
import ClayLayout from '@clayui/layout'

export default function Page({children}) {
    return (
        <ClayLayout.Container className="mt-4">
            {children}
        </ClayLayout.Container>
    )
}
