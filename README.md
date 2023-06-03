Shiny component experiments
===========================

This repository contains experiments with Shiny components for both R and Python.

The folders are organized as follows:

- `r`: R package
- `python`: Python package
- `js`: TypeScript code for the component


## Using the component

### R

Install the R package:

```R
remotes::install_github("wch/shinycomponent/r@main-build")
```

After installing, you can run the demo app. Either copy and paste the [example app](r/inst/examples/puffins/app.R) into your R console, or run:

```R
shiny::runApp(system.file("examples/puffins", package = "shinycomponent"))
```


### Python

To install the Python package:

```bash
pip uninstall -y shinycomponent
pip install "shinycomponent@git+https://github.com/wch/shinycomponent.git@main-build#subdirectory=py"
```

After installing, you can run the demo app. Save the [example app](py/examples/puffins/app.py) to a file named app.py, and run it:

```bash
shiny run app.py --port 8000 --launch-browser
```

If you have cloned the repository, you run the example app (without needing to create a new copy of the file):

```bash
shiny run py/examples/puffins/app.py --port 8000 --launch-browser
```

#### Usage in Python-Shinylive

In Python-Shinylive, you can use the component by adding a `requirements.txt` with the following line:

```
https://raw.githubusercontent.com/wch/shinycomponent/main-build/py/dist/shinycomponent-0.0.1-py3-none-any.whl
```

(This wheel file is built automatically from the `main` branch, and it is committed to the `main-build` branch.)

### Quarto

Quarto documents can use these components via R. First, install the R package as described above. Then in your document, use `library(shinycomponent)` and then you can simply use any components in an R code block.

See the [example document](quarto/components.qmd).


## Developing the component

To do development on the component, first clone this repository.

### R

You can use devtools to install the R package from the sources on disk. First start R in the `r/` directory, then run:

```R
devtools::install(".")
```

Or you can load the package from disk without installing. It will stay loaded for the duration of the R session.

```R
devtools::load_all(".")
```


### Python

To install the Python package in development mode:

```bash
# Create a virtual environment - recommended but not required
python -m venv venv
. venv/bin/activate

cd py

pip install -e .[dev]
```


### TypeScript

The component is written in TypeScript. To set up the build environment, first [install yarn](https://classic.yarnpkg.com/lang/en/docs/install/).

Then, install the dependencies:

```bash
cd js
yarn
```

To build the component:

```bash
yarn build
```

