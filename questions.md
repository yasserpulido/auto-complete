1. What is the difference between Component and PureComponent? give an
example where it might break my app.

A difference between Component and PureComponent is that PureComponent
before re-rendering checks if the props and state changed, and if they
didn't, it won't re-render. This is a performance optimization

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

If a component that is wrapped in a context and this component re-rendered
will cause all the components sons that are wrapped in this context to re-render,
making consume performance.

3. Describe 3 ways to pass information from a component to its PARENT.

By context-api, global states and by props.

4. Give 2 ways to prevent components from re-rendering.

React.memo and shouldComponentUpdate.

5. What is a fragment and why do we need it? Give an example where it might
break my app.

A fragment is used to group elements in one node. An example:\
```
return (
  <React.Fragment>
    <div>1</div>
    <div>2</div>
  </React.Fragment>
)
```


6. Give 3 examples of the HOC pattern.

- withStyles:

```
const withSize = (Component) => {
  return props => {
    const sizes = { width: 400, height: 250 }
    return <Component style={sizes} {...props} />
  }
}

const sizeComponent = withSize(Component)
```

- withMemo:

```
function Something(props) {
  // component logic
}

export default memo(MyComponent);

```

- withChildren:

```
function FirstComponent({children}) {
  // component logic

    return (
        <div>
        {children}
        </div>
    )
}

function SecondComponent(props) {
  // component logic
}

FirstComponent(SecondComponent)
```


1. what's the difference in handling exceptions in promises, callbacks and
async...await.
1. How many arguments does setState take and why is it async.
2. List the steps needed to migrate a Class to Function Component.
3.  List a few ways styles can be used with components.
4.  How to render an HTML string coming from the server.