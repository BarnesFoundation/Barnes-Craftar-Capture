import * as React from 'react'
import { InvnoSearchForm } from '../invnoSearchView/invnoSearchForm'
import { LoadingDialog } from '../../../shared/components/loadingDialog'
import Button from '@material-ui/core/Button'

interface Props {
    response: any,
    success: boolean,
    requestInProgress: boolean,
    requestComplete: boolean,
    itemImageUrl: string,
    searchedInvno: string,
    setSearchedItem: any,
    handleSubmit: any
}

class InvnoSearchView extends React.Component<Props> {

    constructor(props) { super(props) }

    public render() {

        const { requestComplete, requestInProgress, success, itemImageUrl } = this.props

        console.log('The item image url', itemImageUrl)

        const displayText = 'Searching Catchoom for the ID'

        const itemSearchForm = (<InvnoSearchForm handleSubmit={this.props.handleSubmit}></InvnoSearchForm>)
        const setItemButton = (<Button variant="contained" onClick={this.props.setSearchedItem}>Set item</Button>)

        const matchResultText = ((this.props.success) ? 'Match found' : 'No match found')

        const itemImage = (itemImageUrl ? <img src={itemImageUrl} ></img> : <p>A reference image does not exist</p>)

        const searchResultGrid = (
            <table>
                <tbody>
                    <tr>
                        <th>ID:</th>
                        <td>{this.props.response.name}</td>
                    </tr>
                    <tr>
                        <th>UUID:</th>
                        <td>{this.props.response.uuid}</td>
                    </tr>
                </tbody>
            </table>
        )

        return (
            <div className="item-search-container">
                <div className="search-result">
                    <h2>Search By Invno</h2>
                    <div className={(this.props.requestComplete) ? "unhidden" : "hidden"}>
                        <h3>{(this.props.requestComplete) ? matchResultText : null}</h3>
                        {(requestComplete && success) ? itemImage : null}
                        {searchResultGrid}
                    </div>
                </div>
                {itemSearchForm}
                <div className="button-container">
                    {(requestComplete && success) ? setItemButton : null}
                </div>
                {(requestInProgress) ? <LoadingDialog displayText={displayText} dialogOpen={true} /> : null}
            </div>
        )

    }

}

export { InvnoSearchView }