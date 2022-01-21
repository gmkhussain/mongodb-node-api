## new _mongoose.Error.OverwriteModelError(name);

Replace

```js
const User = mongoose.model("User", userSchema);
```

with
```js
const User = mongoose.models['User'] || mongoose.model("User", userSchema);
```

When your code is running ```user.model.js``` is probably being called again, thus calling the initial definition.

NOTE: the model*s* being used in the OR. That method returns an object containing all defined models. It can also be written as ```mongoose.models.User```.
