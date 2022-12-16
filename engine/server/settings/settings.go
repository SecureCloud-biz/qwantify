package settings

type Range struct {
	Min uint16
	Max uint16
}

var (
	AllowedOrigins             []string //allowed origins,  NextJS port
	SinglePort                 int      //single ice-port
	PortRange                  Range    // ice-port range
	IceIpMap                   string
	DisableDefaultInterceptors bool

	VideoCodec string //vp8 or h254
)

func init() {
	//react port
	AllowedOrigins = []string{"https://localhost:3000"}
	SinglePort = 8443
	DisableDefaultInterceptors = false

	VideoCodec = "vpx"
}
