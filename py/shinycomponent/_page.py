from __future__ import annotations

from typing import Optional

from htmltools import TagAttrs, TagChild, tags

from ._htmldeps import page_dep


def page(
    *args: TagChild | TagAttrs,
    title: Optional[str] = None,
    lang: Optional[str] = None,
):
    head = tags.title(title) if title else None
    return tags.html(
        tags.head(
            head,
            tags.style(
                """
                       html { height: 100%; }
                       body { height: 100%; min-height: 100%; }
                       """
            ),
            tags.meta(
                name="viewport",
                content="width=device-width, initial-scale=1",
            ),
        ),
        tags.body(*args),
        page_dep(),
        lang=lang,
    )
