const urlGetList = "/api/search/get_list_facet"

class MainLayout extends React.Component {

  constructor() {
    super()
    this.state = {
      is_enable: true,
      list_facet: []
    }
    this.get_facet_search_list = this.get_facet_search_list.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  get_facet_search_list() {
    fetch(urlGetList, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          list_facet: res
        });
        console.log(res)
      })
      .catch(() => alert("Error in get list"));
  }

  componentDidMount(){
    this. get_facet_search_list()
  }

  handleCheck(params, value) {
    let url = new URL(window.location.href)
    url.searchParams.append(params, value)
    let new_url = new URL(window.location.origin+ "/search")
    new_url.search = url.search;
    window.location.href = new_url.href
  }

  render() {
    const {is_enable, list_facet} = this.state
    const url = new URL(window.location.href)
    return (
      <div>
        {is_enable && <div className="facet-search">
          {
            Object.keys(list_facet).map((name, key) => {
              const item = list_facet[name]
              return(
              <div className="panel panel-default" key={key}>
                <div className="panel-heading clearfix">
                  <h3 className="panel-title">{item.name}</h3>
                </div>
                <div className="panel-body index-body">
                  {
                    Object.keys(item.child).map((subname, k) => {
                      const subitem = item.child[subname]
                      const value = url.searchParams.getAll(item.key).includes(subitem.key) ? true: false
                      return (
                        <label><input type="checkbox" defaultChecked={value} onChange={() => {this.handleCheck(item.key, subitem.key)}}></input>{subitem.name}</label>
                      )
                    })
                  }
                </div>
              </div>
              )
            })
          }

        </div>}
      </div>
    )
  }
}

$(function () {
  console.log("hello")
  ReactDOM.render(
    <MainLayout />,
    document.getElementById('app-facet-search')
  )
});