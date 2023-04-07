### How to create a svelte component
https://gock.net/blog/2022/create-svelte-component-module/

Do not forget to set dedupe on the main package fopr svelte. It will result in undefined $$.


TS event typing
For full typing, change the event raiser to:

const dispatch = createEventDispatcher<{submit:{username:string, password:string}}>()
And the event consumer to:

const loginHandle = function (a: CustomEvent<{username:string, password:string}>) {
    console.log(a.detail.username) //username is type string
    console.log(a.detail.password) //password is type string
}