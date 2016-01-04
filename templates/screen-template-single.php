<script type="text/html" id="tmpl-brj-store-single-template-view">
    <#
    var editable = "";
    if (data.is_editable) {
        editable = 'contenteditable';
    } #>
    <div class="screen-background" style="background-image:url({{data.screenshot.thumbnail}})"></div>
    <div class="detail-header">
        <span class="detail-title"><span class="pop-detail-view">&larr; Back</span></span>
    </div>
    <div class="detail-content">
        <div class="actions-column">
            <div class="template-thumbnail" draggable="true">
                <div class="template-thumbnail-inside">
                    <img draggable="false" src="{{data.screenshot.thumbnail}}">
                </div>
            </div>
            <# if (data.actions) { #>
            <div class="template-actions">
                <#
                for (var action in data.actions) {
                    var label = data.actions[action];
                #>
                <a class="brj-simple-button" data-action="{{action}}">{{label}}</a>
                <# } #>
            </div>
            <# } #>
        </div>
        <div class="settings-column">
            <#
            var readonly = "readonly";
            if (data.is_editable) {
                readonly = "";
            }
            #>
            <input class="template-name" type="text" value="{{data.label}}" {{readonly}} >

            <# if (data.description) { #>
            <div class="settings-section template-description">
                <div class="setting-section-title">Descripton</div>
                <div class="setting-section-content template-description-content">{{data.description}}</div>
            </div>
            <# } #>
            <# if (data.author.name) { #>
            <div class="settings-section template-author">
                <div class="settings-section-title">Author</div>
                <div class="settings-section-content template-author">
                    <div>{{data.author.name}}</div>
                </div>
            </div>
            <# } #>
        </div>
    </div>
</script>
