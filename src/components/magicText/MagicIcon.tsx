import { PropsWithClass } from "../../util";

type MagicIconProps = PropsWithClass<{
    code: string;
    iconSize: number;
}>;

const icons: {[code: string]: string} = {
    "{T}": "icons/tap.svg",
    "{Q}": "icons/untap.svg",
    "{0}": "icons/colourless_0.svg",
    "{1}": "icons/colourless_1.svg",
    "{2}": "icons/colourless_2.svg",
    "{3}": "icons/colourless_3.svg",
    "{4}": "icons/colourless_4.svg",
    "{5}": "icons/colourless_5.svg",
    "{6}": "icons/colourless_6.svg",
    "{7}": "icons/colourless_7.svg",
    "{8}": "icons/colourless_8.svg",
    "{9}": "icons/colourless_9.svg",
    "{10}": "icons/colourless_10.svg",
    "{11}": "icons/colourless_11.svg",
    "{12}": "icons/colourless_12.svg",
    "{13}": "icons/colourless_13.svg",
    "{14}": "icons/colourless_14.svg",
    "{15}": "icons/colourless_15.svg",
    "{16}": "icons/colourless_16.svg",
    "{17}": "icons/colourless_17.svg",
    "{18}": "icons/colourless_18.svg",
    "{19}": "icons/colourless_19.svg",
    "{20}": "icons/colourless_20.svg",
    "{100}": "icons/colourless_100.svg",
    "{1000000}": "icons/colourless_1000000.svg",
    "{W}": "icons/mana_white.svg",
    "{U}": "icons/mana_blue.svg",
    "{B}": "icons/mana_black.svg",
    "{R}": "icons/mana_red.svg",
    "{G}": "icons/mana_green.svg",
    "{C}": "icons/mana_colourless.svg",
    "{2/W}": "icons/mana_hybrid_2w.svg",
    "{2/U}": "icons/mana_hybrid_2u.svg",
    "{2/B}": "icons/mana_hybrid_2b.svg",
    "{2/R}": "icons/mana_hybrid_2r.svg",
    "{2/G}": "icons/mana_hybrid_2g.svg",
    "{B/G}": "icons/mana_hybrid_bg.svg",
    "{B/R}": "icons/mana_hybrid_br.svg",
    "{G/U}": "icons/mana_hybrid_gu.svg",
    "{G/W}": "icons/mana_hybrid_gw.svg",
    "{R/G}": "icons/mana_hybrid_rg.svg",
    "{R/W}": "icons/mana_hybrid_rw.svg",
    "{U/B}": "icons/mana_hybrid_ub.svg",
    "{U/R}": "icons/mana_hybrid_ur.svg",
    "{W/B}": "icons/mana_hybrid_wb.svg",
    "{W/U}": "icons/mana_hybrid_wu.svg",
    "{W/P}": "icons/mana_hybrid_wp.svg",
    "{U/P}": "icons/mana_hybrid_up.svg",
    "{B/P}": "icons/mana_hybrid_bp.svg",
    "{R/P}": "icons/mana_hybrid_rp.svg",
    "{G/P}": "icons/mana_hybrid_gp.svg",
    "{B/G/P}": "icons/mana_hybrid_pp.svg",
    "{B/R/P}": "icons/mana_hybrid_pp.svg",
    "{G/U/P}": "icons/mana_hybrid_pp.svg",
    "{G/W/P}": "icons/mana_hybrid_pp.svg",
    "{R/G/P}": "icons/mana_hybrid_pp.svg",
    "{R/W/P}": "icons/mana_hybrid_pp.svg",
    "{U/B/P}": "icons/mana_hybrid_pp.svg",
    "{U/R/P}": "icons/mana_hybrid_pp.svg",
    "{W/B/P}": "icons/mana_hybrid_pp.svg",
    "{W/U/P}": "icons/mana_hybrid_pp.svg",
    "{S}": "icons/mana_snow.svg",
    "{HW}": "icons/mana_half_white.svg",
    "{HR}": "icons/mana_half_red.svg",
    "{E}": "icons/energy.svg",
    "{P}": "icons/pawprint.svg",
    "{X}": "icons/colourless_x.svg"
}

export const MagicIcon = (props: MagicIconProps) => {
    return <img style={{display: "inline", height: `${props.iconSize}pt`, margin: "0 0.5px"}} src={icons[props.code]} />
}