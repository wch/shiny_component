from __future__ import annotations

__all__ = (
    "input_checkbox",
    "input_number",
    "input_text",
)

from pathlib import PurePath
from typing import Iterable, Literal, Optional

from htmltools import HTMLDependency, Tag, TagAttrs, TagAttrValue, TagChild, tags

from . import __version__
from ._htmldeps import open_props_theme_dep
from ._utils import attr_to_escaped_json


def dark_mode_switch(
    id: str | None = None,
    *args: TagChild | TagAttrs,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-dark-mode-switch",
        forge_dep(),
        id=id,
        *args,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_action_button(
    id: str,
    label: TagChild,
    *args: TagChild | TagAttrs,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-action-button",
        forge_dep(),
        label,
        *args,
        id=id,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_checkbox(
    id: str,
    label: TagChild,
    *args: TagChild | TagAttrs,
    value: bool = False,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-checkbox",
        forge_dep(),
        label if (label is not None) else None,
        *args,
        id=id,
        value=value,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_checkbox_group(
    id: str,
    label: TagChild,
    choices: list[str] | dict[str, str],
    selected: Optional[str | list[str]] = None,
    *args: TagChild | TagAttrs,
    inline: bool = False,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-checkbox-group",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        choices=attr_to_escaped_json(choices),
        selected=attr_to_escaped_json(selected) if (selected is not None) else None,
        inline=inline,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_date(
    id: str,
    label: TagChild,
    value: str | None = None,
    *args: TagChild | TagAttrs,
    min: str | None = None,
    max: str | None = None,
    help_text: str | None = None,
    pill: bool = False,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-date",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        value=value,
        min=min,
        max=max,
        help_text=help_text,
        pill=pill,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_slider(
    id: str,
    label: TagChild,
    min: float,
    max: float,
    value: float | Iterable[float],
    *args: TagChild | TagAttrs,
    step: bool | float | None = None,
    marks: bool | list[float] | dict[str, float] | None = None,
    debounce: int | None = None,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-slider",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        min=min,
        max=max,
        value=attr_to_escaped_json(value),
        step=step,
        marks=attr_to_escaped_json(marks),
        debounce=debounce,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_switch(
    id: str,
    label: TagChild,
    *args: TagChild | TagAttrs,
    value: bool = False,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-switch",
        forge_dep(),
        label if (label is not None) else None,
        *args,
        id=id,
        value=value,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_text(
    id: str,
    label: TagChild,
    value: str | None = None,
    *args: TagChild | TagAttrs,
    help_text: str | None = None,
    placeholder: str | None = None,
    clearable: bool = False,
    password: bool = False,
    pill: bool = False,
    debounce: int | None = None,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-text",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        value=value,
        help_text=help_text,
        placeholder=placeholder,
        clearable=clearable,
        password=password,
        pill=pill,
        debounce=debounce,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_text_area(
    id: str,
    label: TagChild,
    value: str | None = None,
    *args: TagChild | TagAttrs,
    _add_ws: bool = True,
    help_text: str | None = None,
    placeholder: str | None = None,
    rows: int | None = None,
    resize: Literal["none", "auto"] | None = None,
    debounce: int | None = None,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-text-area",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        value=value,
        help_text=help_text,
        placeholder=placeholder,
        rows=rows,
        resize=resize,
        debounce=debounce,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_time(
    id: str,
    label: TagChild,
    value: str | None = None,
    *args: TagChild | TagAttrs,
    min: str | None = None,
    max: str | None = None,
    help_text: str | None = None,
    pill: bool = False,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-time",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        value=value,
        min=min,
        max=max,
        help_text=help_text,
        pill=pill,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_number(
    id: str,
    label: TagChild,
    value: float | None = None,
    *args: TagChild | TagAttrs,
    min: float | None = None,
    max: float | None = None,
    help_text: str | None = None,
    placeholder: str | None = None,
    clearable: bool = False,
    pill: bool = False,
    debounce: int | None = None,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-number",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        value=value,
        min=min,
        max=max,
        help_text=help_text,
        placeholder=placeholder,
        clearable=clearable,
        pill=pill,
        debounce=debounce,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_select(
    id: str,
    label: TagChild,
    choices: list[str] | dict[str, str | list[str] | dict[str, str]],
    selected: Optional[str | list[str]] = None,
    *args: TagChild | TagAttrs,
    help_text: str | None = None,
    placeholder: str | None = None,
    multiple: bool = False,
    clearable: bool = False,
    pill: bool = False,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-select",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        choices=attr_to_escaped_json(choices),
        selected=attr_to_escaped_json(selected),
        help_text=help_text,
        placeholder=placeholder,
        multiple=multiple,
        clearable=clearable,
        pill=pill,
        _add_ws=_add_ws,
        **kwargs,
    )


def input_radio_buttons(
    id: str,
    label: TagChild,
    choices: list[str] | dict[str, str],
    *args: TagChild | TagAttrs,
    selected: Optional[str] = None,
    inline: bool = False,
    button: bool = False,
    pill: bool = False,
    _add_ws: bool = True,
    **kwargs: TagAttrValue,
) -> Tag:
    return Tag(
        "forge-input-radio-buttons",
        forge_dep(),
        tags.div(label, slot="label") if (label is not None) else None,
        *args,
        id=id,
        choices=attr_to_escaped_json(choices),
        selected=selected,
        inline=inline,
        button=button,
        pill=pill,
        _add_ws=_add_ws,
        **kwargs,
    )


def output_plot(
    id: str,
    **kwargs: TagAttrValue,
):
    return Tag(
        "forge-output-plot",
        forge_dep(),
        id=id,
        **kwargs,
    )


def output_text_verbatim(id: str):
    return Tag(
        "forge-output-text-verbatim",
        forge_dep(),
        id=id,
    )


ex_www_path = PurePath(__file__).parent / "www"


def forge_dep() -> list[HTMLDependency]:
    return [
        *open_props_theme_dep(),
        # *shoelace_adapter_dep(),
        HTMLDependency(
            name="forge",
            version=__version__,
            source={
                "package": "shinycomponent",
                "subdir": str(ex_www_path),
            },
            script={"src": "forge.js", "type": "module"},
        ),
    ]


# This is currently bundled into shiny-theme.css, so typically no need to include
# separately.
def shoelace_adapter_dep() -> list[HTMLDependency]:
    return [
        *open_props_theme_dep(),
        HTMLDependency(
            name="shoelace-adapter",
            version=__version__,
            source={
                "package": "shinycomponent",
                "subdir": str(ex_www_path),
            },
            stylesheet={"href": "shoelace-theme-adapter.css"},
        ),
    ]
