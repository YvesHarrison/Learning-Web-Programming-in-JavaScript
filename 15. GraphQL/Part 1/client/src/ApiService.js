/**
 * 
 * Small service for calling GraphQL API server
 */
class ApiService {

    /**
     * define base url and field schemas here
     * @returns {ApiService}
     */
    constructor() {
        this.apiUrl = 'http://localhost:3001/graphql';
        this.userFields = `{id, first_name, last_name, email, department, country, todo_count}`;
        this.todoFields = `{id title completed description user{first_name, last_name}}`;
        this.addtodo = `{title, id, description}`;
        this.updatetodo = `{title, id, description}`;
        this.deletetodo = `{title, id, description}`;
    }

    /**
     * Generic function to fetch data from server
     * @param {string} query
     * @returns {unresolved}
     */
    async getGraphQlData(resource, params, fields) {
        let query = `{${resource} ${this.paramsToString(params)} ${fields}}`;
        if(resource === "addTodo"){
            query = `mutation{${resource} ${this.paramsToString(params)} ${fields}}`;
        }
        else if(resource === "updateTodo"){
            query = `mutation{${resource} ${this.paramsToString(params)} ${fields}}`;
        }
        else if(resource === "deleteTodo"){
            query = `mutation{${resource} ${this.paramsToString(params)} ${fields}}`;
        }
        console.log(resource, query);
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({query}),
        });
        
        if (res.ok) {
            const body = await res.json();
            return body.data;
        } else {
            const body1 = await res.json();
            console.log(body1);
            throw new Error(res.status);
        }
    }

    /**
     * 
     * @param {object} params
     * @returns {array} users list or empty list
     */
    async getUsers(params = {}) {
        const data = await this.getGraphQlData('users', params, this.userFields);
        //return users list
        return data.users;
    }

    /**
     * 
     * @param {object} params
     * @returns {array} users list or empty list
     */
    async getTodos(params = {}) {
        const data = await this.getGraphQlData('todos', params, this.todoFields);
        //return todos list
        return data.todos;
    }

    async addTodos(params = {}) {
        const data = await this.getGraphQlData('addTodo', params, this.addtodo);
        //return todos list
        return data.todos;
    }

    async updateTodos(params = {}) {
        const data = await this.getGraphQlData('updateTodo', params, this.updatetodo);
        //return todos list
        return data.todos;
    }

    async deleteTodos(params = {}) {
        const data = await this.getGraphQlData('deleteTodo', params, this.deletetodo);
        //return todos list
        return data.todos;
    }
    /**
     * 
     * @param {object} params
     * @returns {String} params converted to string for usage in graphQL
     */
    paramsToString(params) {
        let paramString = '';
        if (params.constructor === Object && Object.keys(params).length) {
            let tmp = [];
            for (let key in params) {
                let paramStr = params[key];
                if(paramStr !== '') {
                    if (typeof params[key] === 'string') {
                        paramStr = `"${paramStr}"`;
                    }
                    tmp.push(`${key}:${paramStr}`);
                }
            }
            if (tmp.length) {
                paramString = `(${tmp.join()})`;
            }
        }
        return paramString;
    }

}

export default new ApiService();
