<script type="text/html" id="tmpl-brj-store-template-item-view">
<div class="template-item-thumbnail" draggable="true">
    <div class="template-item-thumbnail-inside">
        <# if (data.screenshot) { #>
        <img draggable="false" src="{{data.screenshot.thumbnail}}">
        <# } #>
    </div>
</div>
<div class="template-item-details">
    <div class="template-item-title">{{data.label}}</div>
</div>
</script>
