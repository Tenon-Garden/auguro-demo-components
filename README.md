# augurō Component Demos

This is a [Deno](https://deno.land/) [React.js](https://reactjs.org/) application that provides a gallery of components, demonstrating designs and interactivity that could (should) be used in the __augurō__ application.

This is a testing-grounds repository and is meant for learning about Deno and React.js best-practices, as well as to demonstrate and facilitate the designs for the __augurō__ app.

## Setup (Dependencies)

Install __Deno__...

... in macOS and Linux with `curl`:

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

> You can install also from `brew` on macOS, but we had trouble with this as it was building from the Rust source through `cargo` and it was taking more than 30 minutes on a Macbook Air.

... in Windows 10 with PowerShell:

```powershell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

You should follow any prompts that print-out, so as to add `deno` to your `PATH` for easier use when calling the application.

You will also need a modern web-browser with a JavaScript engine running to be able to see the functionality of the __React.js__ application.

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

If multiple developers are working on this repository and new submodules have been added, a `git pull` will call `git fetch` on all submodules, but will not run the full updates. In this case, you need to run:

```bash
git submodule update --init --recursive
```

This is the same command as shown initially. As such, you may prefer to always run that command, in case of new submodules from collaborators. Since it will sometimes be necessary to do this, you may just prefer to use that command all the time.

## Run

```bash
cd ./demo-auguro;
deno run --allow-net --allow-read server.tsx;
```

