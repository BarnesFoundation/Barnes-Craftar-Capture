import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import CircularProgress from '@material-ui/core/CircularProgress';

export interface Props {
    open: boolean,
    displayText: string
}

class LoadingDialog extends React.Component {

    open = true

    public render() {
        return (
            <Dialog
                open={this.open}
            >
                <DialogContent>
                    <DialogContentText>
                        Cropping image...
                    </DialogContentText>
                    <CircularProgress></CircularProgress>
                </DialogContent>
            </Dialog>
        )
    }
}

export { LoadingDialog }