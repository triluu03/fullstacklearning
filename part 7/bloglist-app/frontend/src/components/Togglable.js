import { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import React from 'react'

import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired,
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant='outline-dark' onClick={toggleVisibility}>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant='outline-danger' onClick={toggleVisibility}>
                    cancel
                </Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable
