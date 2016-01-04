<script type="text/html" id="tmpl-brj-store-templates-view">
    <#
    var editable = "";
    if (data.is_editable) {
        editable = 'contenteditable';
    } #>
    <div class="detail-header">
        <# if (data.is_editable) { #>
        <input type="text" class="detail-title" value="{{data.label}}">
        <# } else { #>
        <span class="detail-title">{{data.label}}</span>
        <# } #>
    </div>
    <div class="detail-content">
        <?php /*
        <div class="detail-item-row">

            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>

            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>

            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>


            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>

            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>

            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>


            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>

            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>

            <div class="detail-item detail-template-item">
                <div class="template-item-thumbnail">
                    <div class="template-item-thumbnail-inside"></div>
                </div>
                <div class="template-item-details">
                    <div class="template-item-title">My Template</div>
                </div>
            </div>

        </div>
        */ ?>
    </div>
</script>
