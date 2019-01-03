import * as React from 'react'
import { SearchResponse } from '../../../services/itemSearchService'
import { ItemSearchForm } from '../itemSearchView/itemSearchForm'
import Button from '@material-ui/core/Button'

interface Props {
    response: SearchResponse,
    success: boolean,
    requestComplete: boolean,
    searchedId: string,
    setSearchedItem: any
    handleSubmit: Function
}

class ItemSearchView extends React.Component<Props> {

    constructor(props) { super(props) }

    public render() {

        const { requestComplete, success, searchedId } = this.props

        const itemSearchForm = (<ItemSearchForm handleSubmit={this.props.handleSubmit}></ItemSearchForm>)
        const setItemButton = (<Button variant="contained" onClick={this.props.setSearchedItem}>Set item</Button>)

        const matchResultText = ((this.props.success) ? 'Match found' : 'No match found')

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
                    <h2>Search By Item ID</h2>
                    <div className={(this.props.requestComplete) ? "unhidden" : "hidden"}>
                        <h3>{(this.props.requestComplete) ? matchResultText : null}</h3>
                        {searchResultGrid}
                    </div>
                </div>
                {itemSearchForm}
                <div className="button-container">
                    {(requestComplete && success) ? setItemButton : null}
                </div>
            </div>
        )

    }
}

export { ItemSearchView }