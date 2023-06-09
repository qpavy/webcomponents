# q-carousel

Create a fullpage carousel with background-image, title, description and link.

## Usage

`<q-carousel></q-carousel>` works with `<li>` elements. each `<li>` defining a slide that should have those attributes to works :
- `carousel-image-url`: the backround image url of the slide
- `carousel-title`: The title of the slide
- `carousel-description`: The description of the slide
- `carousel-url`: The link of the slide

### Example
```javascript
<q-carousel>
    <li carousel-image-url="image.jpg" carousel-title="title" carousel-description="description" carousel-url="http://url"></li>
    <li carousel-image-url="image2.jpg" carousel-title="title2" carousel-description="description2" carousel-url="http://url2"></li>
    <li carousel-image-url="image3.jpg" carousel-title="title3" carousel-description="description3" carousel-url="http://url3"></li>
    <li carousel-image-url="image4.jpg" carousel-title="title4" carousel-description="description4" carousel-url="http://url4"></li>
</q-carousel>
```

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default |
| ------------ | ------------- | ----------- | --------- | ------- |
| `withScroll` | `with-scroll` |             | `boolean` | `true`  |


## Dependencies

### Depends on

- [q-scrollicon](../q-scrollicon)

### Graph
```mermaid
graph TD;
  q-carousel --> q-scrollicon
  style q-carousel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
