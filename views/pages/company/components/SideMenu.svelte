<script>
    export let changeForm;
    export let cpnName;
    export let cpnCode;
</script>
<div
    id="menu"
    data-id="menu"
    class="mdc-card mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-desktop menu mdc-layout-grid__cell--align-begin"
>
    <ul class="mdc-list">
        <span class="mdc-ripple-surface mdc-list-item--activated"></span>
        <div class="menu-company">
            <span class="mdc-list-item__primary-text">
                {cpnName}
            </span>
            <span class="mdc-list-item__primary-text">
                RUC: {cpnCode}
            </span>
        </div>

        <li data-id="menu_1" class="mdc-list-item" on:click={changeForm("menu_1")} tabindex="0">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text" >
                Datos de la empresa
            </span>
        </li>
        <li data-id="menu_2" class="mdc-list-item" on:click={()=>changeForm("menu_2")}>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
                Datos del representante legal
            </span>
        </li>
        <li data-id="menu_3" class="mdc-list-item" on:click={()=>changeForm("menu_3")}>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
                Datos para el envío de facturación
            </span>
        </li>
        <li class="mdc-list-item" tabindex="0">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
                ¿Quién implementará Bsale?
            </span>
        </li>
        <li class="mdc-list-item" tabindex="0">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
                Informacion para tu proceso
            </span>
        </li>
        <li class="mdc-list-item" tabindex="0">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
                Información para tus documentos
            </span>
        </li>
        <li class="mdc-list-item" tabindex="0">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
                Capacitacíon
            </span>
        </li>
    </ul>
</div>