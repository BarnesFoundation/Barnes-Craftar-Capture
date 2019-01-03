import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import CircularProgress from '@material-ui/core/CircularProgress';

export interface Props {
    dialogOpen: boolean,
    displayText: string
}

class LoadingDialog extends React.Component<Props, object> {

    public render() {

        const displayText = this.props.displayText
        const dialogOpen = this.props.dialogOpen

        return (
            <Dialog open={dialogOpen}>
                <DialogContent>
                    <DialogContentText>
                        {displayText}...
                    </DialogContentText>
                    <CircularProgress></CircularProgress>
                </DialogContent>
            </Dialog>
        )
    }
}

export { LoadingDialog }