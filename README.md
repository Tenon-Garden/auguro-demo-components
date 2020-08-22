# augurō Component Demos

This is a [Deno]() [React.js]() application that provides a gallery of components, demonstrating designs and interactivity that could (should) be used in the __augurō__ application.

This is a testing-grounds repository and is meant for learning about Deno and React.js best-practices, as well as to demonstrate and facilitate the designs for the __augurō__ app.

## Setup (Dependencies)

Install __Deno__ ....

### Submodules

This repository uses the [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) functionality to support version-controlled coordination between some of the other __TenonGarden Productions__ repositories.

Any reasonable modifications to the `.gitmodules` file should be committed, but you should not need to ever commit any modifications from within the submodule directory(ies) as part of this repository.

#### Cloning this Repository

To properly clone this repository and get all submodules initialised and updated in one step, you can use the following command:

```bash
git clone --recurse-submodules https://github.com/Tenon-Garden/<REPO>.git
```

If you had already done a clone of the repository but the submodules are uninitialised, you can run the following to update them all:

```bash
git submodule update --init --recursive
```

#### Updating Submodules

If you think you cloned this repo but forgot to update the submodules, you can run this command to cover all your bases:

```bash
git submodule update --init --recursive
```

Now, as you develop normally, you're likely going to want to update the submodule(s) but leave your current codebase untouched. You could `cd` into submodule directories and do the normal `git fetch` and `git merge` steps (_a.k.a._, `git pull`), but this can be a bit tedious. It's a reasonable approach, though, but if you want something easier you can just call:

```bash
git submodule update --remote
```

## Run

```bash
cd ./demo-auguro;
deno run --allow-net --allow-read server.tsx;
```

